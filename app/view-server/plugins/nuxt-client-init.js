export default async context => {
    return await context.store.dispatch('nuxtClientInit', context)
}