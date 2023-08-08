# :wave: Hi, welcome to Stomble!

This is a temporary documentation written in haste, would be updated and maintained by `Henry Wan`

## :robot: 1. Setting up the repo

**:warning: There's a lot of peer dependency issues which are carried over by the legacy code that we are working with.**

As per usual, clone and install deps
```sh 
$ git clone https://github.com/StombleOfficial/StombleFrontend.git
$ cd StombleFrontend/
$ yarn # or npm install --legacy-peer-deps
```

### Setting up Android emulator and iOS Simulator
* :point_right: Follow [this guide](https://docs.expo.dev/workflow/android-studio-emulator/) for Android emulators 
* :point_right: And [this guide](https://docs.expo.dev/workflow/ios-simulator/) for iOS simulators

### Note: 
```
1. Henry is dirt poor and could only afford Apple juice as his only 
Apple product. If you're like me you need a vm to run iOS simulators.
It's a canon event ಥ‿ಥ

2. If you're using WSL2, hooking up your android AVD in Windows to
the expo cli in terminal is kinda tricky, I would suggest not to.
```

## :runner: 2. Useful scripts

```sh
# Running the expo application
$ npm start
$ npm run tunnel # if the first one does not work

# Linting
$ npm run lint
$ npm run lint:fix # if they could be fixed automatically
```

## :eyes: 3. Style guide and protocols

### 3.1. Eslint

> If you are using `vscode`, it is recommended to install [this extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) from the marketplace.

We are using a modification of the `airbnb` style guide.

I won't be listing all rules, but here are the modifications that were made:
```
String Quotations:
    * No limit 
    * Both single and double quotes are fine

Semi-colon:
    * No semicolons (enjoyer)

Floating Promises:
    * No floating promises allowed
    * Except for IIFE
```

### 3.2. File headers 

**FYI:** By file headers we meant a comment at the start of a file

It is ***required*** to include a figma design reference for all `.tsx` files in `./src/screens`

```tsx
// Reference REGISTER-47

const MyScreen: React.FC = () => {
    // ..... your code
}

export default MyScreen
```

The actual pattern in `regex` if you're interested: `^// ?REFERENCE: .*$`

### 3.3. Commit message guideline

In order to make commit messages as clear as possible, you're highly recommended to follow this format: `category(title): description`

```
// Examples
fix(menu bar): fixed overflow issues on smaller screens
dev(login): integrated with backend
chore(deps): added new dependencies 
```

### 3.4. Develop and merge code

When we work on a new feature we open a new branch with the following format:  
`FMD-<ticket_number>-[optional description]`

After you've finished a feature, make a `Pull Request`.

> :warning: There is currently no branch protection on main, it is down to your own moral compass to not merge your own code by yourself.

## 4. :notebook: Good to knows

### 4.1. Storage and Redux scheme

Async Storage:
```json
{
    "token": "<string>",
    "stomble": redux_storage
}
```

Redux layout:
```json
{
    "tmpStore": {
        "phone": "<string>",
        "password": "<string>",
        "businessName": "<string>",
        "isBusiness": boolean,
        "fullName": "<string>",
        "birthday": "<string>",
        "gender": "<string>",
    },
    "tokens": { 
        "currToken": "<string>",
        // expanding soon to accomodate more features...
    }
}
```

> :thinking: But wait theres token on both the async storage and the redux layout.  
Yeah, thats why I don't like using redux, it gets goofy when you try to use it outside React Components.

### 4.2. Fetcher

Fetcher is a class wrapped around `axios` in hopes of providing an easier experience calling APIs.

> :warning: The base url includes "/dev"

**Usage: Getting Promises**
```tsx
type MyType = TEndpoint<MyRequestType, MyResponseType>

useEffect(() => {
    const payload: MyType['requestType'] = {
        phone: "fake number"
    }

    const my_promise = 
        Fetcher.init<MyType>("POST", "/check-number")
          .withJsonPayload(data)
          .fetchPromise()

    my_promise
      .then(resp => console.log(resp.data.exists))
      .catch(e => console.log(e))
}, [])
```

**Usage: Getting Data with current Token**
```tsx
useEffect(() => {
    // Use IIFE to prevent loose promises
    (async () => {
        const my_data = Fetcher.init<MyType>("POST", "/sign-up")
                          .withJsonPayload(payload)
                          .withCurrentToken()
                          .fetchData()

        console.log(my_data)
    })()
}, [])
```

> :alien: You could chain the methods in any order you want. The 2 terminating methods are `fetchData()` and `fetchPromise()`

---

This is the end of the documentation.  
I might pull a classic Henry move and just forgor :tm: something.  
Let me know if there's anything unclear.  

More updates coming soon.
