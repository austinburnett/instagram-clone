module.exports = {
    testEnvironment: "node",
    reporters: [
        'default',
        [ 'jest-junit', {
            outputDirectory: "../../Server/",
            outputName: "testReport"
        }]
    ]
}
