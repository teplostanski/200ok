import { loadEnvFile } from 'node:process'

loadEnvFile(new URL('../.env.development', import.meta.url))
