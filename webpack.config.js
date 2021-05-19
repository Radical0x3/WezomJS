const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SVGSpritemapPlugin = require("svg-spritemap-webpack-plugin");
const webpack = require("webpack");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
      name: "vendors",
    },
  };

  if (isProd) {
    config.minimizer = [new CssMinimizerPlugin(), new TerserWebpackPlugin()];
  }

  return config;
};

const cssLoaders = (...options) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    "css-loader",
  ];

  for (let opt of options) {
    loaders.push(opt);
  }

  return loaders;
};

module.exports = {
  mode: "development",
  entry: {
    main: path.resolve(__dirname, "./src/js/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    open: true,
    hot: true,
    port: 3000,
  },
  target: "web",
  optimization: optimization(),
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/html/index.html"),
      filename: "index.html",
      inject: "body",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/fonts"),
          to: path.resolve(__dirname, "dist/fonts"),
        },
        {
          from: path.resolve(__dirname, "src/scss/fonts.css"),
          to: path.resolve(__dirname, "dist/css"),
        },
      ],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new SVGSpritemapPlugin(path.resolve(__dirname, "./src/sprites/**/*.svg"), {
      output: {
        filename: "images/icons/spritemap.svg",
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: cssLoaders("postcss-loader"),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders("postcss-loader", "sass-loader"),
      },
      {
        test: /\.html/,
        loader: "html-loader",
        options: {
          sources: false,
        },
      },
    ],
  },
};
