import { QueryResolvers, MutationResolvers } from './type-defs.graphqls'
import { ResolverContext } from './apollo'
import firebase from '../pages/api/firebase'
import console from 'console'
import { useEffect, useState } from 'react'

const userProfile = {
  id: String(1),
  name: 'John Smith',
  status: 'cached',
}

const TwitchView = {
  id: String(2),
  name: 'Distortion2',
  followers: '351000',
  subscribers: '3981',
}

const Query: Required<QueryResolvers<ResolverContext>> = {
  viewer(_parent, _args, _context, _info) {
    return userProfile
  },
  viewerTwitch(_parent, _args, _context, _info) {
    return TwitchView
  },
}

const Mutation: Required<MutationResolvers<ResolverContext>> = {
  updateName(_parent, _args, _context, _info) {
    console.log(`setting a new name to ${_args.name}`)
    userProfile.name = _args.name
    return userProfile
  },
}

export default { Query, Mutation }
