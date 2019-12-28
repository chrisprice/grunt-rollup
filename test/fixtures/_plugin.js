module.exports = () => {
    let counter = 0;

    return {
        banner () {
            return `// ${++counter}`;
        },
    };
};
