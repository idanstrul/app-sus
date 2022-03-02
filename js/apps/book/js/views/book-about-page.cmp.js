export default {
    template: `
        <section class="about-page app-main">
            <h3>This is an about page</h3>
            <button @click="callBus">Call the bus</button>
        </section>
    `,
    methods: {
        callBus() {
            console.log('Calling bus!');
            eventBus.emit('test', 'test data')
        }
    }
}