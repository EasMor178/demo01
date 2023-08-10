<template>
    <div class="row">
        <draggable class="dragArea list-group" :list="list1" :clone="clone" :group="{ name: 'people', pull: pullFunction }"
            @start="start" item-key="id">
            <template #item="{ element }">
                <div class="list-group-item">
                    {{ element.name }}
                </div>
            </template>
        </draggable>
        <draggable class="dragArea list-group" :list="list2" group="people" item-key="id">
            <template #item="{ element }">
                <div class="list-group-item">
                    {{ element.name }}
                </div>
            </template>
        </draggable>
        <draggable class="dragArea list-group" :list="list3" group="people" item-key="id">
            <template #item="{ element }">
                <div class="list-group-item">
                    {{ element.name }}
                </div>
            </template>
        </draggable>
        <draggable class="dragArea list-group" :list="list4" group="people" item-key="id">
            <template #item="{ element }">
                <div class="list-group-item">
                    {{ element.name }}
                </div>
            </template>
        </draggable>
        <draggable class="dragArea list-group" :list="list5" group="people" item-key="id">
            <template #item="{ element }">
                <div class="list-group-item">
                    {{ element.name }}
                </div>
            </template>
        </draggable>
        <draggable class="dragArea list-group" :list="list6" group="people" item-key="id">
            <template #item="{ element }">
                <div class="list-group-item">
                    {{ element.name }}
                </div>
            </template>
        </draggable>
        <draggable class="dragArea list-group" :list="list7" group="people" item-key="id">
            <template #item="{ element }">
                <div class="list-group-item">
                    {{ element.name }}
                </div>
            </template>
        </draggable>
        <draggable class="dragArea list-group" :list="list8" group="people" item-key="id">
            <template #item="{ element }">
                <div class="list-group-item">
                    {{ element.name }}
                </div>
            </template>
        </draggable>
        <draggable class="dragArea list-group" :list="list9" group="people" item-key="id">
            <template #item="{ element }">
                <div class="list-group-item">
                    {{ element.name }}
                </div>
            </template>
        </draggable>
        <draggable class="dragArea list-group" :list="list0" group="people" item-key="id">
            <template #item="{ element }">
                <div class="list-group-item">
                    {{ element.name }}
                </div>
            </template>
        </draggable>
    </div>
</template>

<script lang="ts">
import draggable from "vuedraggable";
let idGlobal = 8;
export default {
    components: {
        draggable
    },
    data() {
        return {
            list1: [
                { name: "01", id: 1 },
                { name: "01", id: 2 },
                { name: "01", id: 3 },
                { name: "01", id: 3 },
                { name: "01", id: 3 },
                { name: "01", id: 3 },
                { name: "01", id: 3 },
            ],
            list2: [
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 6 },
                { name: "", id: 6 },
                { name: "", id: 6 },
                { name: "", id: 7 }
            ],
            list3: [
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 6 },
                { name: "", id: 7 }
            ],
            list4: [
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 6 },
                { name: "", id: 6 },
                { name: "", id: 6 },
                { name: "", id: 7 }
            ],
            list5: [
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 6 },
                { name: "", id: 7 }
            ],
            list6: [
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 6 },
                { name: "", id: 7 }
            ],
            list7: [
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 6 },
                { name: "", id: 7 }
            ],
            list8: [
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 6 },
                { name: "", id: 7 }
            ],
            list9: [
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 6 },
                { name: "", id: 6 },
                { name: "", id: 6 },
                { name: "", id: 7 }
            ],
            list0: [
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 5 },
                { name: "", id: 6 },
                { name: "", id: 6 },
                { name: "", id: 6 },
                { name: "", id: 7 }
            ],
            controlOnStart: true
        };
    },
    methods: {
        clone({ name }) {
            return { name, id: idGlobal++ };
        },
        pullFunction() {
            return this.controlOnStart ? "clone" : true;
        },
        start({ originalEvent }) {
            this.controlOnStart = originalEvent.ctrlKey;
        }
    }
};
</script>
<style scoped lang="scss">
.row {
    height: 2000px;
    width: 100%;
    display: grid;
    border: solid 1px #aaa;
    grid-template-columns: repeat(10, 10%);
}



.list-group-item {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: #eee;
    border: solid 1px #aaa;
}

.dragArea {
    // width: 10%;
    height: 10%;
}
</style>