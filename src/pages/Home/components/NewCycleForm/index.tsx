import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number()
        .min(5, 'O ciclo precisa ser no mínimo de 60 minutos.')
        .max(60, 'O ciclo precisa ser no máximo de 60 minutos.'),
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


export function NewCycleForm() {
    const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    
    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                list="task-suggestions"
                placeholder="Dê um nome para sua tarefa"
                type="text"
                id="task"
                {...register('task')}
                disabled={!!activeCycle}
            />
            <datalist id="task-suggestions">
                <option value="Projeto 01" />
                <option value="Projeto 02" />
                <option value="Projeto 03" />
            </datalist>
            <label htmlFor="minutesAmount">durante</label>
            <MinutesAmountInput
                placeholder="00"
                step={5}
                min={5}
                max={60}
                type="number"
                id="minutesAmount"
                {...register('minutesAmount', { valueAsNumber: true })}
                disabled={!!activeCycle}
            />
            <span>minutos.</span>
        </FormContainer>
    )
}