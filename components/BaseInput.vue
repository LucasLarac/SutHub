<template>
    <div class="input-container">
      <input 
        :value="modelValue" 
        @input="$emit('update:modelValue', $event.target.value)" 
        :type="type" 
        :required="required" 
        :maxlength="maxlength" 
        :inputmode="inputmode"
      />
      <label :class="{ active: modelValue && modelValue.length > 0 }">{{ label }}</label>
    </div>
  </template>
  
  <script setup>
  defineProps({
    modelValue: String, 
    type: {
      type: String,
      default: "text"
    },
    label: {
      type: String,
      required: true
    },
  required: {
    type: Boolean,
    default: false
  },
  maxlength: {
    type: [Number, String],
    default: null
  },
  inputmode: { 
    type: String, 
    default: null 
  } 

  })
  
  defineEmits(["update:modelValue"]);
  </script>
  
  <style scoped>
.input-container {
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

.input-container input:focus + label,
.input-container label.active, input[type="date"] + label{
  top: -10px;
  left: 10px;
  font-size: 12px;
  color: black;
  background: white;
  padding: 0 4px;
  border-radius: 5px;
}

input{
    border: 2px solid rgba(128, 128, 128, 0.816);
    border-radius: 4px;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}




  </style>
  