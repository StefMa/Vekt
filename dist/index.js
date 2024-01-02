"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = exports.version = void 0;
const build_utils_1 = require("@vercel/build-utils");
const path_1 = require("path");
exports.version = 3;
async function build(options) {
    console.log('Hit index.ts!');
    console.log(options.entrypoint);
    console.log(options.workPath);
    console.log(options.repoRootPath);
    console.log(__dirname);
    await (0, build_utils_1.download)(options.files, options.workPath, options.meta);
    const handlerFiles = await (0, build_utils_1.glob)("**", (0, path_1.join)(__dirname, "../handler"));
    const bootstrap = new build_utils_1.FileFsRef({ fsPath: (0, path_1.join)(__dirname, "../bootstrap") });
    bootstrap.mode = 33261; // 0755;
    const startHandlerFile = new build_utils_1.FileFsRef({ fsPath: (0, path_1.join)(__dirname, "../startHandler.sh") });
    startHandlerFile.mode = 33261; // 0755;
    console.log(startHandlerFile.fsPath);
    //const javaPath = new FileFsRef({ fsPath: join(__dirname, "../java") })
    //await downloadJava(javaPath.fsPath)
    const x = "cd " + (0, path_1.join)(__dirname, "../handler") + " ";
    const y = "&& ./gradlew run";
    const u = x + y;
    //await execCommand(u)
    const lambda = new build_utils_1.Lambda({
        files: {
            ...handlerFiles,
            startHandlerFile,
            bootstrap
        },
        handler: startHandlerFile.fsPath,
        runtime: "provided.al2023"
    });
    return { output: lambda };
}
exports.build = build;
