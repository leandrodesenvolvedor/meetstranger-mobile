// Importa utilitários de estilos
import { StyleSheet } from 'react-native';  
// Importa cores do sistema
import { colors } from '../../constants/color';
// Importa tokens de espaçamento, borda e sombras
import { BorderRadius, Shadows, Spacing  } from  '../../design-system/tokens/spacing';
// Importa tipografia padronizada
import { TextStyles } from '../../design-system/tokens/typography';
// Cria e exporta os estilos da tela de login
export const loginStyles = StyleSheet.create({
    // Container principal
    container: {
        flex: 1, // Ocupa toda a tela
        backgroundColor: colors.background, // Cor de fundo padrão
    },

    // Área central de conteúdo
    content: {
        flex: 1, // Ocupa o espaço disponível
        paddingHorizontal: Spacing.xl, // Espaçamento horizontal
        justifyContent: 'center', // Centraliza verticalmente
        alignItems: 'center', // Centraliza horizontalmente
    },

    // Logo do app
    logo: {
        width: 240, // Tamanho fixo da imagem (mantido)
        height: 240, // Mantém proporção quadrada
        marginBottom: Spacing.xl, // Espaço abaixo
        ...Shadows.lg, // Shadow manual - padronizado
        shadowColor: colors.shadow, // Garante cor correta da sombra
    },

    // Container dos inputs
    inputContainer: {
        width: '100%', // Ocupa toda a largura disponível
    },

    // Título principal
    title: {
        ...TextStyles.title, // Tipografia de título
        fontWeight: 'bold', // Negrito para destaque
        color: colors.primary, // Cor principal
        marginBottom: Spacing.sm, // Espaço abaixo
        letterSpacing: -0.2, // Espaçamento entre letras
        lineHeight: 26, // Mantido para não quebrar layout
        textAlign: 'center', // centraliza o texto
    },
    subtitle: { 
        ...TextStyles.body, // Texto padrão
        color: colors.textSecondary, // Cor secundária
        marginBottom: Spacing['4xl'], // Espaçamento maior
        textAlign: 'center', // Centraliza
    },

    // Botton login
    loginButton: {
        marginBottom: Spacing.sm, // Espaço abaixo
        marginTop: Spacing.xl, // Espaço acima
        borderRadius: BorderRadius.lg, // Borda arredondada
    },
});