const test = require("ava");
const grunt = require("grunt");

const plugin = require("./fixtures/_plugin");

grunt.task.init = () => {};
grunt.loadTasks("./tasks/");
grunt.file.setBase("./test/");

const checkFile = (t, dest) => {
    const fileContent = grunt.file.read(dest);
    t.snapshot(fileContent, dest);
};

test.serial.cb("Task basic behavior", (t) => {
    const dest = "fixtures/expected/basic.js";
    grunt.config.init({
        rollup: {
            basic: {
                files: {
                    [dest]: ["fixtures/_basic.js"],
                },
            },
        },
    });
    grunt.tasks("rollup", [], () => {
        checkFile(t, dest);
        t.end();
    });
});

test.serial.cb("With source map", (t) => {
    const dest = "fixtures/expected/sourcemap.js";
    grunt.config.init({
        rollup: {
            sourcemap: {
                files: {
                    [dest]: ["fixtures/_basic.js"],
                },
                options: {
                    sourcemap: true,
                },
            },
        },
    });
    grunt.tasks("rollup", [], () => {
        checkFile(t, dest);
        checkFile(t, `${dest}.map`);
        t.end();
    });
});

test.serial.cb("With source map inline", (t) => {
    const dest = "fixtures/expected/sourcemap-inline.js";
    grunt.config.init({
        rollup: {
            sourcemap_inline: {
                files: {
                    [dest]: ["fixtures/_basic.js"],
                },
                options: {
                    sourcemap: "inline",
                },
            },
        },
    });
    grunt.tasks("rollup", [], () => {
        checkFile(t, dest);
        t.end();
    });
});

test.serial.cb("With multiple files input", (t) => {
    const dest = "fixtures/expected";
    grunt.config.init({
        rollup: {
            multiple: {
                files: {
                    [dest]: ["fixtures/_basic.js", "fixtures/_second.js"],
                },
            },
        },
    });
    grunt.tasks("rollup", [], () => {
        checkFile(t, `${dest}/_basic.js`);
        checkFile(t, `${dest}/_second.js`);
        t.end();
    });
});

test.serial.cb("With src and dest config", (t) => {
    const dest = "fixtures/expected/target.js";
    grunt.config.init({
        rollup: {
            srcDest: {
                src: "fixtures/_basic.js",
                dest,
            },
        },
    });
    grunt.tasks("rollup", [], () => {
        checkFile(t, dest);
        t.end();
    });
});

test.serial.cb("With plugin array", (t) => {
    const dest1 = "fixtures/expected/plugin1.js";
    const dest2 = "fixtures/expected/plugin2.js";
    grunt.config.init({
        rollup: {
            plugin_array: {
                files: {
                    [dest1]: ["fixtures/_basic.js"],
                    [dest2]: ["fixtures/_basic.js"],
                },
                options: {
                    plugins: [plugin()],
                },
            },
        },
    });
    grunt.tasks("rollup", [], () => {
        const startsWith1 = /^\/\/\s1/; //matches // 1
        const startsWith2 = /^\/\/\s2/; //matches // 2
        const outputA = grunt.file.read(dest1).trim();
        const outputB = grunt.file.read(dest2).trim();
        const pluginPrinted12 = outputA.match(startsWith1) && outputB.match(startsWith2);
        const pluginPrinted21 = outputA.match(startsWith2) && outputB.match(startsWith1);
        t.truthy(pluginPrinted12 || pluginPrinted21);
        t.end();
    });
});

test.serial.cb("With plugin function", (t) => {
    const dest1 = "fixtures/expected/plugin1.js";
    const dest2 = "fixtures/expected/plugin2.js";
    grunt.config.init({
        rollup: {
            plugin_function: {
                files: {
                    [dest1]: ["fixtures/_basic.js"],
                    [dest2]: ["fixtures/_basic.js"],
                },
                options: {
                    plugins: () => [plugin()],
                },
            },
        },
    });
    grunt.tasks("rollup", [], () => {
        checkFile(t, dest1);
        checkFile(t, dest2);
        t.end();
    });
});

test.afterEach("Cleanup", () => {
    grunt.file.delete("fixtures/expected/");
});
