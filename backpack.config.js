const { join } = require("path");

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = join(__dirname, "./server/YourEntryFile.js");
    config.output.path = join(__dirname, "./dist/server");

    config.resolve = {
      extensions: [".ts", ".js", ".json"]
    };

    config.module.rules.push({
      test: /\.ts$/,
      loader: "awesome-typescript-loader"
    });

    return config;
  }
};
