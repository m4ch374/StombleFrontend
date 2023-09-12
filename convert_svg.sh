#!/bin/bash

# Didnt write any shell scripts in a long time
# Not using any functions we ball bro

# !!!!!!!! NOTE:
# This sicript only works when you copy and pasted
# from figma without any modifications

# *********************************************************
# *                    Meta settings                      *
# *                Modify if necessary                    *
# *********************************************************
unwanted_attributes=("xmlns")

tags=("svg" "path" "circle" "rect" "ellipse" "line" "polyline" "polygon" "g" "clipPath" "defs" "radialGradient")

default_tw_class="h-xl aspect-square"

expected_root_folder="$(pwd)/src/assets/icons"

# =========================================================
# Syntax checking
# =========================================================
if [ "$#" -eq 0 ]
then
    echo "error: No arguments provided" >&2
    echo "usage: sh convert_svg.sh [file_name1] [file_name2] ...." >&2
    exit 1
fi
# =========================================================

# =========================================================
# Error checking & Safeguarding
#
# Error checking:
#   Check if file exist
#   Check if required library exists
#
# Safeguard:
#   Let user know if file is not with .tsx extension
# =========================================================
if ! npm list | grep -Eq "react-native-svg"
then
    echo "error: dependency 'react-native-svg' has not been installed" >&2
    echo -e "try running: \033[0;32m"npx expo install react-natve-svg"\033[0m" >&2
    exit 1
fi

not_found_files=()
illegal_files=()

for file in "$@"
do
    if ! test -f "$file"
    then
        not_found_files+=("$file")
        continue
    fi

    if ! echo "$file" | grep -Eq "\.tsx$"
    then
        illegal_files+=("$file")
    fi
done

if [ "${#not_found_files[@]}" != 0 ]
then
    echo "error: The following files does not exist:" >&2
    for file in "${not_found_files[@]}"
    do
        echo -e "\t$file" >&2
    done
    echo "" >&2
    exit 1
fi

if [ "${#illegal_files[@]}" != 0 ]
then
    echo "warning: The following files does not end with '.tsx':"
    for file in "${illegal_files[@]}"
    do
        echo -e "\t$file"
    done
    echo ""

    echo -n "Are you sure you want to continue? [y/N]: "
    read -r phrase

    processed=$(echo "$phrase" | cut -b1 | tr "[:upper:]" "[:lower:]")
    if [ "$processed" != "y" ]
    then
        echo "Process terminated"
        exit 0
    fi
fi
# =========================================================

# =========================================================
# Conversion
#
# Convert file to React Native usable svg syntax
# =========================================================

echo "======================================================"
echo "Starting conversion:"
echo -e "======================================================\n"

# Generate sed inner script
inner_script=""
for curr in "${unwanted_attributes[@]}"
do
    inner_script+="s/[^ ]*[^<]$curr=\"[^\"]*\"//g; "
done

for curr in "${tags[@]}"
do
    replace="${curr^}"
    inner_script+="s|<$curr|<$replace|g; s|</$curr>|</$replace>|g; "
done

for file in "$@"
do
    echo -e "Converting \033[0;32m$file\033[0m"

    # Setup react component structure
    file_name=$(echo "${file##*/}" | cut -d'.' -f1)

    sed -i -E "
        s/^<svg(.*)width=\"[^\"]*\"(.*)$/<svg \1 \2/g;
        s/^<svg(.*)height=\"[^\"]*\"(.*)$/<svg \1 \2/g;
        s/^<svg(.*)$/<svg className={customTwMerge(\"$default_tw_class\", classname)} \1/g
    " "$file"
    code_to_copy=$(cat "$file")

    tmp=$(mktemp)

    import_relative_path=$(realpath --relative-to="$(dirname "$file")" "$expected_root_folder")
    # I forgot how to do multi-line lol
    {
        echo "import React from \"react\""
        echo "import TIcon from \"$import_relative_path/_IconType\""
        echo -e "import customTwMerge from \"utils/CustomTwMerge\"\n"

        echo -e "const $file_name: React.FC<TIcon> = ({ classname }) => {return ($code_to_copy)}\n"

        echo -e "export default $file_name\n"
    } >> "$tmp"

    cp "$tmp" "$file"
    rm "$tmp"

    # Generate import statement
    import_statement=""
    for elem in "${tags[@]}"
    do
        if ! grep -Eq "<$elem" "$file"
        then
            continue
        fi

        import="${elem^}"
        if [ -z "$import_statement" ]
        then
            import_statement+="$import"
            continue
        fi

        import_statement="$import_statement, $import"
    done

    if [ -n "$import_statement" ]
    then
        import_statement="import {$import_statement} from \"react-native-svg\"\n"
    fi

    # remove unwanted attribute and convert to react native compatible svgs
    sed -i -E "$inner_script" "$file"

    # Add import statement
    sed -i -E "0,/^$/s/^$/$import_statement/" "$file"
done
# =========================================================

# =========================================================
# Fix any eslint style issues
# =========================================================
npx eslint --fix "$@" > /dev/null & eslint_pid=$!

echo ""
spinner="/-\|"
delay=0.2
i=0
while ps -p $eslint_pid > /dev/null
do
    printf "\r[%s] Running eslint..." "${spinner:i % 4:1}"
    sleep $delay
    i=$((i + 1))
done

echo ""
echo -e "\033[0;32mDONE!\033[0m\n"
# =========================================================
