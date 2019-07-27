
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

// Apollo
import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { HttpClient } from 'selenium-webdriver/http';
import { getMainDefinition } from 'apollo-utilities';

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule]
})
export class GraphQLModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {

    const httpLink2 = httpLink.create({
        uri: 'http://localhost:4000/'
      });


    const subscriptionLink = new WebSocketLink({
        uri: `ws://localhost:4000/`,
        options: {
          reconnect: true,
        },
      });

    const link = split(
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query);
          return kind === 'OperationDefinition' && operation === 'subscription';
        },
        subscriptionLink,
        httpLink2
      );

    apollo.create({
      link: link,
      cache: new InMemoryCache(),
      connectToDevTools: true
    });
  }
}