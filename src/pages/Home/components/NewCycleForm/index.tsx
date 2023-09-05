import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../..";
import {useFormContext} from 'react-hook-form';

export function NewCycleForm() {
    const {activeCycle} = useContext(CyclesContext);
    const {register} = useFormContext();
    
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