import {
    BuildOptions,
    FileFsRef,
    Lambda,
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
    const lambda = new Lambda({
        files: {
            ...handlerFiles,
            startHandlerFile,
            bootstrap
        },
        handler: startHandlerFile.fsPath,
        runtime: "provided.al2"
    })

    return { output: lambda }
}