module.exports = {
    plugins: [
        require('autoprefixer')({}),
        require('postcss-discard-comments')({ removeAll: true }),
        require('cssnano')({ preset: 'default' })
    ]
}