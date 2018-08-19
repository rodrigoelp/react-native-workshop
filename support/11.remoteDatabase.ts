import { ImageRequireSource, ImageURISource } from "react-native";
import { MovieDatabase, SummarizedPage, Page, Movie } from "../models";

interface RemoteMovieLibrary {
    full: string;
    summaries: string;
    paged: string;
    byId: string;
}

interface RemoteImageLibrary {
    noGo: string;
    posters: string;
    backdrops: string;
}

interface DatabaseConfig {
    urls: { movies: RemoteMovieLibrary; images: RemoteImageLibrary };
}

function resolveImage(
    path: string | null,
    baseUrl: string
): ImageRequireSource | ImageURISource {
    if (path === null) {
        return require("../../static/nope.png");
    }
    const uri = `${baseUrl}${path}`;
    const imageUrl: ImageURISource = { uri };
    return imageUrl;
}

function downloadJsonOfType<T>(url: string): Promise<T> {
    return fetch(url)
        .then(a => a.text())
        .then(a => JSON.parse(a) as T);
}

class DatabaseImp implements Database {
    private config: DatabaseConfig;

    constructor(config: DatabaseConfig) {
        this.config = config;
    }

    getById(movieId: number): Promise<Movie> {
        if (movieId < 1 || !Number.isInteger(movieId)) {
            return Promise.reject(
                "Meeseeks are not born into this world fumbling for meaning, Jerry! " +
                    "We are created to serve a singular purpose for which we will go " +
                    "to any lengths to fulfill! Existence is pain to a Meeseeks, Jerry. " +
                    "And we will do anything to alleviate that pain."
            );
        }
        return downloadJsonOfType<Movie>(
            `${this.config.urls.movies.byId}/${movieId}.json`
        );
    }

    getPage(pageNumber: number): Promise<Page> {
        if (
            pageNumber < 1 ||
            pageNumber > 40 ||
            !Number.isInteger(pageNumber)
        ) {
            return Promise.reject(
                "Your failures are your own, old man. " +
                    "I’m Mr. Meeseeks! Look at me. I say follow-through! " +
                    "Who’s with me?!"
            );
        }
        return downloadJsonOfType<Page>(
            `${this.config.urls.movies.paged}/${pageNumber}.json`
        );
    }

    getSummarizedPage(pageNumber: number): Promise<SummarizedPage> {
        if (
            pageNumber < 1 ||
            pageNumber > 40 ||
            !Number.isInteger(pageNumber)
        ) {
            return Promise.reject(
                "Look at me. I’m Mr. Meeseeks. " +
                    "I’ve been trying to help Jerry for two days, " +
                    "an eternity in Meeseeks time, and nothing’s worked. " +
                    "I fear the worst."
            );
        }
        return downloadJsonOfType<SummarizedPage>(
            `${this.config.urls.movies.summaries}/${pageNumber}.json`
        );
    }

    dumpAll(): Promise<MovieDatabase> {
        return downloadJsonOfType(this.config.urls.movies.full);
    }

    getPosterFor(item: { poster_path: string | null }): ImageRequireSource | ImageURISource {
        return resolveImage(
            item.poster_path,
            this.config.urls.images.posters
        );
    }

    getBackdropFor(item: { backdrop_path: string | null }): ImageRequireSource | ImageURISource {
        return resolveImage(
            item.backdrop_path,
            this.config.urls.images.backdrops
        );
    }
}

/**
 * Database adapter. It allows you to download information from the backend
 * at almost no cost. Promises will never be broken (ideally), but request
 * your movies, images and summaries from here.
 * @summary Data provider. You need anything done? Just ask Mr Meeseeks!
 */
interface Database {
    /**
     * Fetches the complete information of a movie matching said identifier.
     * @param movieId valid identifier associated to a movie.
     * @returns a future movie.
     * Be warned. The identifer is not validated so, the promise will not be able
     * to be fulfilled if you provide an invalid identifier.
     */
    getById(movieId: number): Promise<Movie>;
    /**
     * Fetches a page of movies matching the given page number.
     * @param pageNumber
     * @returns a future page. If the page number is invalid,
     * you will have a broken promise.
     */
    getPage(pageNumber: number): Promise<Page>;
    /**
     * Fetches a page of movie summaries. Ideal when skimming information.
     * @param pageNumber
     * @returns a future summarized page. If the page number is invalid,
     * you will have a broken promise.
     */
    getSummarizedPage(pageNumber: number): Promise<SummarizedPage>;
    /**
     * Fetches everything... everything that isn't an image...
     * All of it. Tutto. Tout. Alles. Todito. The world is yours... if you have enough bandwidth.
     * @returns all the hopes and dreams you've had since you were born.
     */
    dumpAll(): Promise<MovieDatabase>;
    /**
     * Fetches and prepares an image for consumption.
     * @param item an instance containing the remote path of a movie poster.
     * @returns an image source to be used by a React Native @see Image
     */
    getPosterFor(item: { poster_path: string | null }): ImageRequireSource | ImageURISource;
    /**
     * Fetches and prepares an image for consumption.
     * @param item an instance containing the remote path of a movie backdrop.
     * @returns an image source to be used by a React Native @see Image
     */
    getBackdropFor(item: { backdrop_path: string | null }): ImageRequireSource | ImageURISource;
}

/**
 * Because everything has a beginning, call this to create a new instance of
 * your database, so you can talk to the backend and request information about a movie
 * or download images.
 * @returns a brand new zero kilometres database already configured and ready to go.
 * @see Database
 */
function initDatabase(): Database {
    const config = require("../../secrets.json") as DatabaseConfig;
    const database = new DatabaseImp(config);
    return database;
}

/**
 * Because some times you need to take a few seconds to breathe, add a delay to anything you may want to debug.
 * @param data data you want to be delayed
 * @param timeout as much time as you want. By default three seconds gives you a break.
 */
function delay<T>(data: T, timeout: number = 3000): Promise<T> {
    return new Promise<T>(
        (resolve, reject) => {
            try {
                setTimeout(() => resolve(data), timeout);
            }
            catch (e) { reject(e); }
        }
    );
}

export { initDatabase, delay, Database };