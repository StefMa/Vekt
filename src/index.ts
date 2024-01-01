import {
    BuildOptions,
    FileFsRef,
    Lambda,
    execCommand,
    glob
} from '@vercel/build-utils';
import { join } from 'path';

export const version = 3;

export async function build(options: BuildOptions) {
    console.log('Hit index.ts!')
    console.log(options.entrypoint)
    console.log(options.workPath)
    console.log(options.repoRootPath)
    console.log(__dirname)
    const handlerFiles = await glob("**", join(__dirname, "../handler"))
    const java = await glob("**", join(__dirname, "../amazon-corretto-11.0.21.9.1-linux-x86"))
    const bootstrap = new FileFsRef({ fsPath: join(__dirname, "../bootstrap") })
    bootstrap.mode = 33261 // 0755;
    const startHandlerFile = new FileFsRef({ fsPath: join(__dirname, "../startHandler.sh") })
    startHandlerFile.mode = 33261 // 0755;
    console.log(startHandlerFile.fsPath)

    const x = "cd " + join(__dirname, "../handler") + " "
    const y = "&& ./gradlew run"
    const u = x + y
    //await execCommand(u)
    const lambda = new Lambda({
        files: {
            ...java,
            ...handlerFiles,
            startHandlerFile,
            bootstrap
        },
        handler: startHandlerFile.fsPath,
        runtime: "provided.al2023"
    })

    return { output: lambda }
}