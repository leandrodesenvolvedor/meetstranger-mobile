import { StyleSheet } from 'react-native';
import { colors } from '../../constants/color';
import { BorderRadius, Shadows, Spacing } from '../../design-system/tokens/spacing';
import { TextStyles } from '../../design-system/tokens/typography';
import { Button } from '../../components/Button';


export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: Spacing.xl,
    },
    header: {
        paddingTop: Spacing['4xl'],
        paddingBottom: Spacing.xl,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: Spacing.xl,
        borderRadius: BorderRadius["2xl"],
        shadowRadius:20,
        shadowColor: colors.shadow,
        margin: 'auto',
    },
    welcome: {
        ...TextStyles.title,
        fontWeight: 'bold',
        color: colors.secondary,
        marginBottom: Spacing.xs,
        letterSpacing: -0.1,
        lineHeight: 24,
        margin: 'auto',
    },
    subtitle: {
        ...TextStyles.caption,
        color: colors.textSecondary,
        lineHeight: 18,
        margin: 'auto',
    },
    content: {
        flex: 1,
        margin: 'auto',
    },
    Card: {
        backgroundColor: colors.surface,
        padding: Spacing.xl,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.xl,
        
    },
        cardTitle: {
        ...TextStyles.title,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: Spacing.md,
        letterSpacing: -0.2,
        margin: 'auto',
    },
    cardDescription: {
        ...TextStyles.caption,
        color: colors.textSecondary,
        lineHeight: 20,
    },
    feature: {
        alignItems: 'center',
    },
    featureIcon: {
       fontSize: 28,
       marginBottom: Spacing.xs,
    },
    featureText: {
        ...TextStyles.small,
        color: colors.primary,
        fontWeight: '500',
    },
    buttons: {
        paddingBottom: Spacing['4xl'],
    },
    button: {
        marginBottom: Spacing.sm,
    },

});