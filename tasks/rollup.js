const path = require("path");
const rollup = require("rollup");

module.exports = (grunt) => {
    grunt.registerMultiTask("rollup", "Grunt plugin for rollup - next-generation ES6 module bundler", () => {
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
            outro: null,
            onwarn: null,
            paths: null,
            plugins: [],
            sourceMap: false,
            sourceMapFile: null,
            treeshake: true,
            interop: true,
            amd: {
                id: null,
                define: null,
            },
        });

        const promises = current.files.map((files) => {
            let { plugins } = options;
            if (typeof plugins === "function") {
                plugins = plugins();
            }

            const inputOptions = (({
                cache,
                external,
                context,
                moduleContext,
                onwarn,
                treeshake,
            }) => ({
                cache,
                external,
                context,
                moduleContext,
                onwarn,
                treeshake,
            }))(options);
            const outputOptions = (({
                format,
                exports,
                paths,
                amd,
                name,
                globals,
                indent,
                strict,
                banner,
                footer,
                intro,
                outro,
                sourcemap,
                sourcemapFile,
                interop,
            }) => ({
                format,
                exports,
                paths,
                amd,
                name,
                globals,
                indent,
                strict,
                banner,
                footer,
                intro,
                outro,
                sourcemap,
                sourcemapFile,
                interop,
            }))(options);

            return rollup
                .rollup({
                    ...inputOptions,
                    input: files.src,
                    plugins,
                })
                .then(bundle => bundle.generate({
                    ...outputOptions,
                    file: files.dest,
                }))
                .then(result => result.output.forEach((output) => {
                    let { code } = output;

                    if (outputOptions.sourcemap === true) {
                        const sourceMapOutPath = outputOptions.sourcemapFile || `${files.dest}.map`;
                        grunt.file.write(sourceMapOutPath, String(output.map));
                        code += `\n//# sourceMappingURL=${path.relative(path.dirname(files.dest), sourceMapOutPath)}`;
                    }
                    else if (outputOptions.sourcemap === "inline") {
                        code += `\n//# sourceMappingURL=${output.map.toUrl()}`;
                    }

                    grunt.file.write(files.dest, code);
                }));
        });

        Promise
            .all(promises)
            .then(done)
            .catch(error => grunt.fail.warn(error));
    });
};
