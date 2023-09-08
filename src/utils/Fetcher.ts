import axios, { CreateAxiosDefaults, AxiosInstance, AxiosError } from "axios"
import { TEndpoint } from "types/endpoints"
import AsyncStorage from "@react-native-async-storage/async-storage"

/*
  Currently resort to the link given by the backend people
  Will figure out a way to connect to localhost

  Once we've done that then we'll use a .env file
*/
const base = "https://9uq6c9v3ab.execute-api.ap-southeast-2.amazonaws.com/dev"
// const base = "http://localhost:3000/dev"

type Method = "GET" | "POST" | "PUT" | "DELETE"

// Thy type any is very much needed in this case
/* eslint-disable @typescript-eslint/no-explicit-any */
class Fetcher<T extends TEndpoint<any, any>> {
  private instance: AxiosInstance

  private endpoint: string | undefined

  private payload: T["requestType"] | undefined

  private useCurrentToken: boolean | undefined

  private constructor(method: Method) {
    let axiosConf: CreateAxiosDefaults = {
      baseURL: base,
      method: method,
    }

    if (method != "GET") {
      axiosConf = {
        ...axiosConf,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    }

    this.instance = axios.create(axiosConf)
    return this
  }

  static init<T extends TEndpoint<any, any> = TEndpoint<void, void>>(
    method: Method,
    endpoint: string,
  ) {
    const fetcher = new Fetcher<T>(method)
    fetcher.endpoint = endpoint
    fetcher.useCurrentToken = false

    return fetcher
  }

  withJsonPaylad(payload: T["requestType"]) {
    this.payload = payload
    return this
  }

  withToken(token: string) {
    this.instance.defaults.headers.common.Authorization = `Bearer ${token}`
    return this
  }

  withCurrentToken() {
    this.useCurrentToken = true
    return this
  }

  fetchPromise(): Promise<T["requestType"]> {
    return this.instance.request({
      data: this.payload,
      url: this.endpoint,
    })
  }

  // Fuck it we ball bro
  // No error checking lets go
  async fetchData(): Promise<T["responseType"]> {
    try {
      if (this.useCurrentToken) {
        const token = `Bearer ${await AsyncStorage.getItem("token")}`
        this.instance.defaults.headers.common.Authorization = token
      }

      const resp: { data: T["responseType"] } = await this.instance.request({
        data: this.payload,
        url: this.endpoint,
      })

      // Its either my skill issue or its just really hard to type it out
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return resp.data
    } catch (e) {
      this.logFetchError(e)
    }

    return undefined
  }

  // =============================================================
  // Helpers
  // =============================================================
  private logFetchError(e: unknown) {
    const errorMeta = {
      name: "Unknown",
      message: "Unknown error",
      code: "Unknown",
      config: "Unknown",
    }

    if (e instanceof AxiosError) {
      errorMeta.name = e.name
      errorMeta.code = e.code as string // ew, type casting
      errorMeta.message = e.message
      errorMeta.config = JSON.stringify(
        {
          baseURL: e.config?.baseURL,
          endpoint: e.config?.url,
          headers: e.config?.headers,
          body: JSON.parse(e.config?.data as string) as object, // type cast again
        },
        undefined,
        4,
      ).slice(2, -1)
    }

    console.log()
    // Adding newline fucks up the formatting from expo
    console.log("============================================================")
    console.log("An error has occurred!")
    console.log(`\tName:    ${errorMeta.name}`) // I dont think js provides us anything w/ alligning stuff
    console.log(`\tCode:    ${errorMeta.code}`)
    console.log(`\tMessage: ${errorMeta.message}`)
    console.log()
    console.log("************************************************************")
    console.log("*                       CONFIG                             *")
    console.log("************************************************************")
    errorMeta.config
      .split("\n")
      .forEach(l => console.log(l.replace(/ {4}/, "")))
    console.log("============================================================")
  }
}

export default Fetcher
