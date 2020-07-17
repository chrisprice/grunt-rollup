const path = require("path");
const rollup = require("rollup");

module.exports = (grunt) => {
    grunt.registerMultiTask("rollup", "Grunt plugin for rollup - next-generation ES6 module bundler", () => {
        const { current } = grunt.task;

        const done = current.async();
        const options = current.options({
            // core input options
            external: [],
            plugins: [],
            // advanced input options
            cache: null,
            onwarn: null,
            preserveEntrySignatures: "strict",
            strictDeprecations: false,
            // danger zone
            acorn: null,
            acornInjectPlugins: null,
            context: null,
            moduleContext: null,
            preserveSymlinks: false,
            shimMissingExports: false,
            treeshake: true,
            // core output options
            format: "es",
            globals: {},
            name: null,
            // advanced output options
            assetFileNames: null,
            banner: null,
            chunkFileNames: null,
            compact: false,
            entryFileNames: null,
            extend: false,
            externalLiveBindings: true,
            footer: null,
            hoistTransitiveImports: true,
            inlineDynamicImports: false,
            interop: true,
            intro: null,
            manualChunks: null,
            minifyInternalExports: null,
            outro: null,
            paths: null,
            preserveModules: false,
            sourcemap: false,
            sourcemapExcludeSources: false,
            sourcemapFile: null,
            sourcemapPathTransform: null,
            // danger zone
            amd: {
                id: null,
                define: null,
            },
            esModule: true,
            exports: "auto",
            freeze: true,
            indent: true,
            namespaceToStringTag: false,
            noConflict: false,
            preferConst: false,
            strict: true,
            systemNullSetters: false,
        });

        const promises = current.files.map((files) => {
            let { plugins } = options;
            if (typeof plugins === "function") {
                plugins = plugins();
            }

            const inputOptions = (({
                external,
                cache,
                onwarn,
                preserveEntrySignatures,
                strictDeprecations,
                acorn,
                acornInjectPlugins,
                context,
                moduleContext,
                preserveSymlinks,
                shimMissingExports,
                treeshake,
            }) => ({
                external,
                cache,
                onwarn,
                preserveEntrySignatures,
                strictDeprecations,
                acorn,
                acornInjectPlugins,
                context,
                moduleContext,
                preserveSymlinks,
                shimMissingExports,
                treeshake,
            }))(options);
            const outputOptions = (({
                format,
                globals,
                name,
                assetFileNames,
                banner,
                chunkFileNames,
                compact,
                entryFileNames,
                extend,
                externalLiveBindings,
                footer,
                hoistTransitiveImports,
                inlineDynamicImports,
                interop,
                intro,
                manualChunks,
                minifyInternalExports,
                outro,
                paths,
                preserveModules,
                sourcemap,
                sourcemapExcludeSources,
                sourcemapFile,
                sourcemapPathTransform,
                amd,
                esModule,
                exports,
                freeze,
                indent,
                namespaceToStringTag,
                noConflict,
                preferConst,
                strict,
                systemNullSetters,
            }) => ({
                format,
                globals,
                name,
                assetFileNames,
                banner,
                chunkFileNames,
                compact,
                entryFileNames,
                extend,
                externalLiveBindings,
                footer,
                hoistTransitiveImports,
                inlineDynamicImports,
                interop,
                intro,
                manualChunks,
                minifyInternalExports,
                outro,
                paths,
                preserveModules,
                sourcemap,
                sourcemapExcludeSources,
                sourcemapFile,
                sourcemapPathTransform,
                amd,
                esModule,
                exports,
                freeze,
                indent,
                namespaceToStringTag,
                noConflict,
                preferConst,
                strict,
                systemNullSetters,
            }))(options);

            const isMultipleInput = Array.isArray(files.src) && files.src.length > 1;

            return rollup
                .rollup({
                    ...inputOptions,
                    input: files.src,
                    plugins,
                })
                .then(bundle => bundle.generate({
                    ...outputOptions,
                    [isMultipleInput ? "dir" : "file"]: files.dest,
                }))
                .then(result => result.output.forEach((output) => {
                    let { code } = output;
                    const dest = isMultipleInput ? path.join(files.dest, output.fileName) : files.dest;
                    const dir = path.dirname(dest);

                    if (outputOptions.sourcemap === true) {
                        const sourceMapOutPath = outputOptions.sourcemapFile || `${dest}.map`;
                        grunt.file.write(sourceMapOutPath, String(output.map));
                        code += `\n//# sourceMappingURL=${path.relative(dir, sourceMapOutPath)}`;
                    }
                    else if (outputOptions.sourcemap === "inline") {
                        code += `\n//# sourceMappingURL=${output.map.toUrl()}`;
                    }

                    grunt.file.write(dest, code);
                }));
        });

        Promise
            .all(promises)
            .then(done)
            .catch(error => grunt.fail.warn(error));
    });
};
