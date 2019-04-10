const test = require("ava");
const grunt = require("grunt");

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
                    sourceMap: true,
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
                    sourceMap: "inline",
                },
            },
        },
    });
    grunt.tasks("rollup", [], () => {
        checkFile(t, dest);
        t.end();
    });
});

test.after("Cleanup", () => {
    grunt.file.delete("fixtures/expected/");
});
