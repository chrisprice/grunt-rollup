const test = require("ava");
const grunt = require("grunt");

const plugin = require("./fixtures/plugin");

grunt.task.init = () => {};
grunt.loadTasks("./tasks/");
grunt.file.setBase("./test/");

const checkFile = (t, dest) => {
    const fileContent = grunt.file.read(dest);
    t.snapshot(fileContent);
};

test.serial.cb("Task basic behavior", (t) => {
    const dest = "fixtures/expected/basic.js";
    grunt.config.init({
        rollup: {
            basic: {
                files: {
                    [dest]: ["fixtures/basic.js"],
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
                    [dest]: ["fixtures/basic.js"],
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
                    [dest]: ["fixtures/basic.js"],
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
                    [dest]: ["fixtures/basic.js", "fixtures/second.js"],
                },
            },
        },
    });
    grunt.tasks("rollup", [], () => {
        checkFile(t, `${dest}/basic.js`);
        checkFile(t, `${dest}/second.js`);
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
                    [dest1]: ["fixtures/basic.js"],
                    [dest2]: ["fixtures/basic.js"],
                },
                options: {
                    plugins: [plugin()],
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

test.serial.cb("With plugin function", (t) => {
    const dest1 = "fixtures/expected/plugin1.js";
    const dest2 = "fixtures/expected/plugin2.js";
    grunt.config.init({
        rollup: {
            plugin_function: {
                files: {
                    [dest1]: ["fixtures/basic.js"],
                    [dest2]: ["fixtures/basic.js"],
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
