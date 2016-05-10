var meow = require('meow');

module.exports = meow(`
    Usage
        $ node index <input>

    Options
      -f, --force Force rewrite
      -t, --type operation type
      -s, --scene scene
      -r, -src src,
      -p, -pattern patterName
    Example
        $ node index -f
`, {
    alias: {
        f: 'force',
        s: 'scene',
        t : 'type',
        r : 'src',
        p : 'pattern'
    }
});
