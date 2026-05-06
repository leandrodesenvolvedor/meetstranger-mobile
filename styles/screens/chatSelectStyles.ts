import { StyleSheet } from 'react-native';
import { colors } from '../../constants/color';

export const chatSelectStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    padding: 16,
  },

  header: {
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  cardContent: {
    alignItems: 'center',
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 8,
  },

  cardDescription: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
    textAlign: 'center',
  },

  buttonContainer: {
    marginTop: 'auto',
  },

  backButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});