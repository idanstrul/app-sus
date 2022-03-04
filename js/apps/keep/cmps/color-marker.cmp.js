export default {
    props: ['note'], 
    template: `
        <!-- <pre>{{markClr}}
             {{note}}
            </pre> -->
        <select name="mark-clr" v-model="markClr" @change="$emit('markerChanged', markClr)">
            <option value="mark-default">default</option>
            <option value="mark-red">red</option>
            <option value="mark-orange">orange</option>
            <option value="mark-yellow">yellow</option>
            <option value="mark-green">green</option>
            <option value="mark-green-blue">green-blue</option>
            <option value="mark-blue">blue</option>
            <option value="mark-dark-blue">dark-blue</option>
            <option value="mark-purple">purple</option>
            <option value="mark-pink">pink</option>
            <option value="mark-brown">brown</option>
            <option value="mark-grey">grey</option>
        </select>
    `,
    emits: ['markerChanged'],
    data(){
        return {
            markClr: this.note.mark
        }
    },
    watch: {
        note: {
            handler(){
                console.log('updating markClr');
                this.markClr = this.note.mark;
            },
            deep: true
        }    
    }
}