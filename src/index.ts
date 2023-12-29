import {
    BuildOptions,
    FileFsRef,
    Lambda,
    debug
} from '@vercel/build-utils';

export const version = 3;

export async function build(options: BuildOptions) {
    debug('Hit index.ts!')
    const lambda = new Lambda({
        files: {
            'handler': new FileFsRef({ fsPath: "handler" }),
            'startHandler.sh': new FileFsRef({ fsPath: "startHandler.sh" })
        },
        handler: "startHandler.sh",
        runtime: "provided.al2023"
    })

    return { output: lambda }
}