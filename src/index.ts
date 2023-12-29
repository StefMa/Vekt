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
    const x = await glob("..handler/**", { includeDirectories: true })
    const handlerPath = new FileFsRef({ fsPath: join(__dirname, "../handler") })
    console.log(handlerPath.fsPath)
    const startHandlerPath = new FileFsRef({ fsPath: join(__dirname, "../startHandler.sh") })
    startHandlerPath.mode = 33261 // 0755;
    console.log(startHandlerPath.fsPath)
    const lambda = new Lambda({
        files: {
            //'handler': handlerPath,
            ...x,
            startHandlerPath
        },
        handler: startHandlerPath.fsPath,
        runtime: "provided.al2023"
    })

    return { output: lambda }
}