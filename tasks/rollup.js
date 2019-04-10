const path = require("path");
const rollup = require("rollup");

module.exports = (grunt) => {
    grunt.registerMultiTask("rollup", "Grunt plugin for rollup - next-generation ES6 module bundler", () => {
        // console.log(grunt.task.current);
        const { current } = grunt.task;

        const done = current.async();
        const options = current.options({
            cache: null,
            external: [],
            format: "es",
            exports: "auto",
            moduleId: null,
            moduleName: null,
            globals: {},
            indent: true,
            useStrict: true,
            banner: null,
            footer: null,
            intro: null,
            preferConst: false,
            outro: null,
            onwarn: null,
            paths: null,
            plugins: [],
            pureExternalModules: false,
            sourceMap: false,
            sourceMapFile: null,
            sourceMapRelativePaths: true,
            treeshake: true,
            interop: true,
            amd: {
                id: null,
                define: null,
            },
        });

        const promises = current.files.map((file) => {
            if (file.src.length === 0) {
                grunt.fail.warn("No entry point specified.");
            }

            let input;
            if (file.src.length > 1) {
                input = file.src;
                const warn = "Multiple entry points detected. Be sure to include rollup-plugin-multi-entry in plugins.";
                grunt.log.writeln(warn);
            }
            else {
                [input] = file.src;

                if (!grunt.file.exists(input)) {
                    grunt.fail.warn(`Entry point ${input} not found.`);
                }
            }

            let { plugins } = options;

            if (typeof plugins === "function") {
                plugins = plugins();
            }

            return rollup.rollup({
                cache: options.cache,
                input,
                external: options.external,
                plugins,
                context: options.context,
                moduleContext: options.moduleContext,
                onwarn: options.onwarn,
                preferConst: options.preferConst,
                pureExternalModules: options.pureExternalModules,
                treeshake: options.treeshake,
            }).then((bundle) => {
                let { sourceMapFile } = options;
                if (!sourceMapFile && options.sourceMapRelativePaths) {
                    sourceMapFile = path.resolve(file.dest);
                }

                return bundle.generate({
                    format: options.format,
                    exports: options.exports,
                    paths: options.paths,
                    amd: options.amd,
                    name: options.moduleName,
                    globals: options.globals,
                    indent: options.indent,
                    strict: options.useStrict,
                    banner: options.banner,
                    footer: options.footer,
                    intro: options.intro,
                    outro: options.outro,
                    sourcemap: options.sourceMap,
                    sourcemapFile: sourceMapFile,
                    interop: options.interop,
                });
            }).then((result) => {
                let { code } = result;

                if (options.sourceMap === true) {
                    const sourceMapOutPath = `${file.dest}.map`;
                    grunt.file.write(sourceMapOutPath, result.map.toString());
                    code += `\n//# sourceMappingURL=${path.basename(sourceMapOutPath)}`;
                }
                else if (options.sourceMap === "inline") {
                    code += `\n//# sourceMappingURL=${result.map.toUrl()}`;
                }

                grunt.file.write(file.dest, code);
            });
        });

        Promise
            .all(promises)
            .then(done)
            .catch(error => grunt.fail.warn(error));
    });
};
