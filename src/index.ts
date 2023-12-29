import {
    BuildOptions,
    FileFsRef,
    Lambda
} from '@vercel/build-utils';
import { join } from 'path';

export const version = 3;

export async function build(options: BuildOptions) {
    console.log('Hit index.ts!')
    console.log(options.entrypoint)
    console.log(options.workPath)
    console.log(options.repoRootPath)
    console.log(__dirname)
    const handlerPath = new FileFsRef({ fsPath: join(__dirname, "handler") })
    const startHandlerPath = new FileFsRef({ fsPath: join(__dirname, "startHandler.sh") })
    console.log(handlerPath.fsPath)
    const lambda = new Lambda({
        files: {
            'handler': handlerPath,
            'startHandler.sh': startHandlerPath
        },
        handler: "startHandler.sh",
        runtime: "provided.al2023"
    })

    return { output: lambda }
}