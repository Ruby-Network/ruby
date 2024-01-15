self.__dynamic$config = {
  prefix: '/js/sw/service/dynamic/',
  encoding: 'xor',
  mode: 'production',
  logLevel: 0,
  bare: {
    version: 2,
    path: '/bare/',
  },
  tab: {
    title: null,
    icon: null,
    ua: null,
  },
  assets: {
    prefix: '/dynamic/',
    files: {
      handler: 'dynamic.handler.js',
      client: 'dynamic.client.js',
      worker: 'dynamic.worker.js',
      config: 'dynamic.config.js',
      inject: null,
    }
  },
  block: [
  
  ]
};

self.xor = {
    randomMax: 100,
    randomMin: -100,

    encode: (str) => {
        if (!str) return str;
        return encodeURIComponent(
            str
            .toString()
            .split('')
            .map((char, ind) =>
                ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char
            )
            .join('')
        );
    },
    decode: (str) => {
        if (!str) return str;
        let [input, ...search] = str.split('?');

        return (
            decodeURIComponent(input)
            .split('')
            .map((char, ind) =>
                ind % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char
            )
            .join('') + (search.length ? '?' + search.join('?') : '')
        );
    },
};

self.__dynam$ic = {
    prefix: self.__dynamic$config.prefix,
    encodeUrl: xor.encode,
    decodeUrl: xor.decode,
};
