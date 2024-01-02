
import {
    BuildOptions,
    FileFsRef,
    Lambda,
    download,
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
    await download(options.files, options.workPath, options.meta)
    const handlerFiles = await glob("**", join(__dirname, "../handler"))
    const bootstrap = new FileFsRef({ fsPath: join(__dirname, "../bootstrap") })
    bootstrap.mode = 33261 // 0755;
    const startHandlerFile = new FileFsRef({ fsPath: join(__dirname, "../startHandler.sh") })
    startHandlerFile.mode = 33261 // 0755;
    console.log(startHandlerFile.fsPath)

    //const javaPath = new FileFsRef({ fsPath: join(__dirname, "../java") })
    //await downloadJava(javaPath.fsPath)

    const x = "cd " + join(__dirname, "../handler") + " "
    const y = "&& ./gradlew run"
    const u = x + y
    //await execCommand(u)
    const lambda = new Lambda({
        files: {
            ...handlerFiles,
            startHandlerFile,
            bootstrap
        },
        handler: startHandlerFile.fsPath,
        runtime: "provided.al2023"
    })

    return { output: lambda }
}
