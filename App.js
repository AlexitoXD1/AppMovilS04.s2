import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { validateName, validateEmail, validatePassword, validateConfirmPassword, validatePhone } from './validators';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState('');

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    // Real-time validation
    let error = '';
    switch (field) {
      case 'name':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        setPasswordStrength(getPasswordStrength(value));
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(value, formData.password);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
    }
    setErrors({ ...errors, [field]: error });
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6) return 'Débil';
    if (password.length < 10 && !/[A-Z]/.test(password)) return 'Media';
    return 'Fuerte';
  };

  const handleSubmit = () => {
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.confirmPassword, formData.password),
      phone: validatePhone(formData.phone)
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every(error => !error)) {
      alert('Registro exitoso');
    }
  };

  const renderInput = (field, placeholder) => (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, errors[field] ? styles.inputError : null]}
          placeholder={placeholder}
          value={formData[field]}
          onChangeText={(value) => handleInputChange(field, value)}
          secureTextEntry={field.includes('password')}
        />
        <Icon
          name={errors[field] ? 'error' : formData[field] ? 'check-circle' : 'info'}
          size={20}
          color={errors[field] ? 'red' : formData[field] ? 'green' : 'gray'}
          style={styles.icon}
        />
      </View>
      {errors[field] ? <Text style={styles.error}>{errors[field]}</Text> : null}
      {field === 'password' && formData.password ? (
        <Text style={[styles.strength, { color: passwordStrength === 'Fuerte' ? 'green' : passwordStrength === 'Media' ? 'orange' : 'red' }]}>
          Fortaleza: {passwordStrength}
        </Text>
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario de Registro</Text>
      
      {renderInput('name', 'Nombre')}
      {renderInput('email', 'Correo Electrónico')}
      {renderInput('password', 'Contraseña')}
      {renderInput('confirmPassword', 'Confirmar Contraseña')}
      {renderInput('phone', 'Teléfono')}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  inputContainer: {
    marginBottom: 15
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative'
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    fontSize: 16
  },
  inputError: {
    borderColor: 'red'
  },
  icon: {
    position: 'absolute',
    right: 10
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5
  },
  strength: {
    fontSize: 12,
    marginTop: 5
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }
});