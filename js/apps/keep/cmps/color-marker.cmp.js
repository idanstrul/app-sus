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


// <select name="mark-clr" v-model="markClr" @change="$emit('markerChanged', markClr)">
// <option value="mark-default" style="color: var(--mark-clr-default)">●</option>
// <option value="mark-red" style="color: var(--mark-clr-red)">●</option>
// <option value="mark-orange" style="color: var(--mark-clr-orange)">●</option>
// <option value="mark-yellow" style="color: var(--mark-clr-yellow)">●</option>
// <option value="mark-green" style="color: var(--mark-clr-green)">●</option>
// <option value="mark-green-blue" style="color: var(--mark-clr-green-blue)">●</option>
// <option value="mark-blue" style="color: var(--mark-clr-blue)">●</option>
// <option value="mark-dark-blue" style="color: var(--mark-clr-dark-blue)">●</option>
// <option value="mark-purple" style="color: var(--mark-clr-purple)">●</option>
// <option value="mark-pink" style="color: var(--mark-clr-pink)">●</option>
// <option value="mark-brown" style="color: var(--mark-clr-brown)">●</option>
// <option value="mark-grey" style="color: var(--mark-clr-grey)">●</option>
// </select>