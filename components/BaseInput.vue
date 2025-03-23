<template>
  <div class="input-container">
    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :type="type"
      :required="required" :maxlength="maxlength" :inputmode="inputmode" :class="[
        'border rounded-md px-3 py-2 w-full',
        error ? 'border-red-600 border-2' : 'border-gray-300 border-2'
      ]" />
    <label :class="{ active: modelValue && modelValue.length > 0 }">{{ label }}</label>
    <p v-if="error" class="text-red-500 text-xs mt-1 text-start">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  label: String,
  type: { type: String, default: 'text' },
  required: Boolean,
  maxlength: Number,
  inputmode: String,
  error: String
})


defineEmits(["update:modelValue"]);
</script>

<style scoped>
input[type="date"] {
  appearance: none;
  -webkit-appearance: none;
  padding: 10px 12px;
  font-size: 16px;
  height: 47.2px;
}

.input-container {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 1rem;
}

.input-container input {
  width: 100%;
  padding: 10px 10px 10px 10px;
  font-size: 16px;
}

.input-container label {
  position: absolute;
  top: 10px;
  left: 12px;
  color: #999;
  pointer-events: none;
  transition: 0.2s ease all;
}

.input-container input:focus+label,
.input-container label.active,
input[type="date"]+label {
  top: -10px;
  left: 10px;
  font-size: 12px;
  color: black;
  background: white;
  padding: 0 4px;
  border-radius: 5px;
}

input {
  /* border: 2px solid rgba(128, 128, 128, 0.816); */
  border-radius: 4px;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>