import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from 'react-hook-form';

export function Home() {
    const { register, handleSubmit, watch } = useForm()

    function handleCreateNewCycle(data: any){
        console.log(data)
    }
    const task = watch('task');
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} >
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        list="task-suggestions"
                        placeholder="Dê um nome para sua tarefa"
                        type="text"
                        id="task"
                        {...register('task')}
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
                        {...register('minutesAmount', {valueAsNumber: true})}
                    />
                    <span>minutos.</span>
                </FormContainer>
                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>
                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}