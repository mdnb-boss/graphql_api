import { Injectable } from '@angular/core';
// Apollo
import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: "http://localhost:4000/graphql" }),
      cache: new InMemoryCache()
    });
  }
}
