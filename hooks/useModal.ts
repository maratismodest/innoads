import { useContext } from 'react'
import { ModalContext } from '@/context/ModalContext'

export function useModal() {
    return useContext(ModalContext)
}
