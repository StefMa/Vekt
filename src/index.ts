import {
    BuildOptions,
    FileFsRef,
    Lambda
} from '@vercel/build-utils';

export const version = 3;

export async function build(options: BuildOptions) {
    console.log('Hit index.ts!')
    console.log(options.entrypoint)
    console.log(options.workPath)
    console.log(options.workPath)
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