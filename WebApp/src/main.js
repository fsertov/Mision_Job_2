import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

import { setContext } from 'apollo-link-context'
import "bootstrap/dist/css/bootstrap.min.css"

const httpLink = createHttpLink({
    uri: 'https://apigateway-mision-job.herokuapp.com/', 
})


const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            "Authorization": localStorage.getItem("access_token") || ""
        }
    }
})

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

const apolloProvider = new createApolloProvider({
    defaultClient: apolloClient
})

createApp(App).use(router).use(apolloProvider).mount('#app')