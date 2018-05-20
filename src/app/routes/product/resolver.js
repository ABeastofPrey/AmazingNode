const productMocks = [{
  id: 1,
  brand: 'Giant',
  wheels: 2
}, {
  id: 2,
  brand: 'Prince',
  sportType: 'TENNIS'
}]

exports.resolver = {
  Query: {
    products(root, { id }, context) {
      const results = id ? productMocks.filter(p => p.id == id) : productMocks
      if (results.length > 0)
        return results
      else
        throw Error(404, `Product with id ${id} does not exist.`);
    }
  },

  Product: {
    __resolveType(obj, context, info) {
      return obj.wheels ? 'Bicycle' :
        obj.sportType ? 'Racket' : null
    }
  }
}