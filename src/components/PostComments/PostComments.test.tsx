import { fireEvent, render, screen } from '@testing-library/react';
import PostComment from '.';

describe('Teste para o componente PostComment', () => {
    it('Deve renderizar o componente corretamente', () => {
        render(<PostComment />);
        expect(screen.getByTestId('comment-textarea')).toBeInTheDocument();
        expect(screen.getByTestId('comment-button')).toBeInTheDocument();
        expect(screen.getByTestId('comments-list')).toBeInTheDocument();
    });

    it('Deve inserir dois comentários corretamente', () => {
        render(<PostComment />);

        const textarea = screen.getByTestId('comment-textarea');
        const button = screen.getByTestId('comment-button');

        // Insere o primeiro comentário
        fireEvent.change(textarea, { target: { value: 'Primeiro comentário' } });
        fireEvent.click(button);

        // Verifica que o primeiro comentário apareceu na lista
        expect(screen.getByText('Primeiro comentário')).toBeInTheDocument();
        expect(screen.getAllByTestId('comment')).toHaveLength(1);

        // Insere o segundo comentário
        fireEvent.change(textarea, { target: { value: 'Segundo comentário' } });
        fireEvent.click(button);

        // Verifica que ambos os comentários estão na lista
        expect(screen.getByText('Primeiro comentário')).toBeInTheDocument();
        expect(screen.getByText('Segundo comentário')).toBeInTheDocument();
        expect(screen.getAllByTestId('comment')).toHaveLength(2);

        // Verifica que o textarea foi limpo após cada envio
        expect(textarea).toHaveValue('');
    });
});