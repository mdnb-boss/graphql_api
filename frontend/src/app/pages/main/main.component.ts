import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from "graphql-tag";
import { map, tap } from "rxjs/operators";
import { Observable } from 'apollo-link';
import { Subscription } from 'rxjs';

class User {
  constructor(
    public id: String,
    public name: String,
    public email: String
  ) { }
}

const subscription = gql`
  subscription {
    userAdded {
      id
      name
      email
    }
  }
`;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  users$: Array<User>;

  todoSubscription: Subscription;
  users: User[] = [];

  constructor(private apollo: Apollo) {  }

  ngOnInit() {

    const getUsers = gql`
    query {
      users(page: 0, per_page: 100) {
        id
        name
        email
      }
    }
  `;

  this.apollo
    .watchQuery({
      query: getUsers,
      fetchPolicy: "network-only"
    })
    .valueChanges.subscribe((result: any) => {
      console.log(result.data.users)
      this.users$ = result.data.users;
    });



    this.todoSubscription = this.apollo
      .subscribe({
        query: subscription,
        fetchPolicy: "network-only"
      })
      .subscribe(({ data }) => {
        
        console.log(data)

        this.users = [...this.users, data.userAdded];
      });
  }

  ngOnDestroy() {
    this.todoSubscription.unsubscribe();
  }

}
