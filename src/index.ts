import tar from 'tar';
import fetch from 'node-fetch';
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
    const bootstrap = new FileFsRef({ fsPath: join(__dirname, "../bootstrap") })
    bootstrap.mode = 33261 // 0755;
    const startHandlerFile = new FileFsRef({ fsPath: join(__dirname, "../startHandler.sh") })
    startHandlerFile.mode = 33261 // 0755;
    console.log(startHandlerFile.fsPath)

    const javaPath = new FileFsRef({ fsPath: join(__dirname, "../java") })
    download(javaPath.fsPath)

    const x = "cd " + join(__dirname, "../handler") + " "
    const y = "&& ./gradlew run"
    const u = x + y
    //await execCommand(u)
    const lambda = new Lambda({
        files: {
            javaPath,
            ...handlerFiles,
            startHandlerFile,
            bootstrap
        },
        handler: startHandlerFile.fsPath,
        runtime: "provided.al2023"
    })

    return { output: lambda }
}

async function download(pathToSave: string) {
    const response = await fetch("https://api.foojay.io/disco/v3.0/ids/514f8e553fa8693ab74ef35df96f566f/redirect")
    response.body.pipe((tar.extract({ cwd: pathToSave, strip: 1 })))
}