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
        <draggable class="dragArea list-group" :list="list10" group="people" item-key="id">
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
            ],
            list2: [
                { name: "02", id: 5 },
                { name: "02", id: 6 },
                { name: "02", id: 7 }
            ],
            list3: [
                { name: "03", id: 5 },
                { name: "03", id: 6 },
                { name: "03", id: 7 }
            ],
            list4: [
                { name: "04", id: 5 },
                { name: "04", id: 6 },
                { name: "04", id: 7 }
            ],
            list5: [
                { name: "05", id: 5 },
                { name: "05", id: 6 },
                { name: "05", id: 7 }
            ],
            list6: [
                { name: "06", id: 5 },
                { name: "06", id: 6 },
                { name: "06", id: 7 }
            ],
            list7: [
                { name: "07", id: 5 },
                { name: "07", id: 6 },
                { name: "07", id: 7 }
            ],
            list8: [
                { name: "08", id: 5 },
                { name: "08", id: 6 },
                { name: "08", id: 7 }
            ],
            list9: [
                { name: "09", id: 5 },
                { name: "09", id: 6 },
                { name: "09", id: 7 }
            ],
            list10: [
                { name: "10", id: 5 },
                { name: "10", id: 6 },
                { name: "10", id: 7 }
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