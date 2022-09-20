import { JSON } from "json-as";

// Create the Schemas
// @ts-ignore
@json
class JSONSchema {
  firstName: string;
  lastName: string;
  human: boolean;
  age: i32;
  meta: Meta;
  language: string;
  location: f64[];
}

// @ts-ignore
@json
class Meta {
  country: string;
  awesome: boolean;
}

// Create the JSON object
const data: JSONSchema = {
  firstName: "Jairus",
  lastName: "Tanaka",
  age: 14,
  human: true,
  meta: {
    country: "US",
    awesome: true,
  },
  language: "english",
  location: [-43.130850291, 32.926401705],
};

// Now, encode and decode
const encoded: string = JSON.stringify(data);
console.log(`Encoded: ${encoded}`);
export const decoded = JSON.parse<JSONSchema>(encoded);
