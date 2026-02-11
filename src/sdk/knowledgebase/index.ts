/*
 * SDK module: Knowledgebase
 */

import { OminityCore } from "@ominity/api-typescript";
import { Events } from "./events.js";
import { Articles } from "./articles.js";
import { Categories } from "./categories.js";
import { Tags } from "./tags.js";


export class Knowledgebase extends OminityCore {
  private _events?: Events;

  get events(): Events {
    return (this._events ??= new Events(this._options));
  }

  private _articles?: Articles;

  get articles(): Articles {
    return (this._articles ??= new Articles(this._options));
  }

  private _categories?: Categories;

  get categories(): Categories {
    return (this._categories ??= new Categories(this._options));
  }

  private _tags?: Tags;

  get tags(): Tags {
    return (this._tags ??= new Tags(this._options));
  }
}
