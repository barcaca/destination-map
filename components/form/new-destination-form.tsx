'use client'
import { newDestinationAction } from '@/app/actions/new-destination'
import {
  NewDestinationFormSchema,
  type TNewDestinationData,
} from '@/app/actions/new-destination/schema'
import { CommandSelect } from '@/components/form/command-select'
import { CustomFormField } from '@/components/form/custom-form-field'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { customToast } from '@/lib/custom-toast'
import { getCountries, getStates } from '@/lib/data/places-api'
import type { Country, Region, State } from '@/types/place'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon, Trash2Icon } from 'lucide-react'
import { startTransition, useActionState, useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

const defaultValues = {
  title: '',
  description: '',
  location: {
    region: { id: undefined, name: '' },
    country: { id: undefined, name: '' },
    state: { id: undefined, name: '' },
  },
  images: [{ url: '' }],
}

interface NewDestinationFormProps {
  regions: Region[]
}

export function NewDestinationForm({ regions }: NewDestinationFormProps) {
  const [formState, formAction, isPending] = useActionState(
    newDestinationAction,
    undefined
  )
  const [countries, setCountries] = useState<Country[]>([])
  const [states, setStates] = useState<State[]>([])

  const form = useForm<TNewDestinationData>({
    resolver: zodResolver(NewDestinationFormSchema),
    defaultValues,
  })
  const { control, watch, reset } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'images',
  })

  const watchRegion = watch('location.region')
  const watchCountry = watch('location.country')

  useEffect(() => {
    if (fields.length === 0) {
      append({ url: '' })
    }
  }, [fields, append])

  useEffect(() => {
    if (watchRegion.id) {
      getCountries(watchRegion.id).then(setCountries)
    }
  }, [watchRegion])

  useEffect(() => {
    if (watchCountry.id) {
      getStates(watchCountry.id).then(setStates)
    }
  }, [watchCountry])

  function addInputImage() {
    if (fields.length >= 3) return
    append({ url: '' })
  }

  async function onSubmit(formData: TNewDestinationData) {
    startTransition(() => formAction(formData))
  }

  useEffect(() => {
    if (formState) {
      customToast(formState)
      formState.status < 400 && reset()
    }
  }, [formState, reset])

  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <CustomFormField
              name="title"
              label="Nome do destino"
              placeholder="Insira o nome do destino"
            />
            <div className="grid grid-cols-3 gap-2">
              <CommandSelect
                name="location.region"
                label="Região"
                items={regions}
                emptyMessage="Nenhuma região encontrada"
                placeholder="Região"
                placeholderSearch="Busque uma região"
              />
              <CommandSelect
                name="location.country"
                label="País"
                items={countries}
                emptyMessage="Nenhuma país encontrada"
                placeholder="País"
                placeholderSearch="Busque uma país"
              />
              <CommandSelect
                name="location.state"
                label="Estado"
                items={states}
                emptyMessage="Nenhuma estado encontrada"
                placeholder="Estado"
                placeholderSearch="Busque um estado"
              />
            </div>
            <CustomFormField
              name="description"
              label="Descrição"
              placeholder="Descreva o destino..."
              type="textarea"
            />
          </div>
          <div className="space-y-4">
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="flex w-full items-end gap-2">
                  <CustomFormField
                    name={`images.${index}.url`}
                    label={`URL da Imagem ${index + 1}`}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                    className={index === 0 ? 'hidden' : ''}
                    disabled={fields.length === 1}
                  >
                    <Trash2Icon size={16} />
                  </Button>
                </div>
              )
            })}
            {fields.length < 3 && (
              <Button
                className="w-full"
                type="button"
                variant={'outline'}
                onClick={addInputImage}
              >
                <PlusIcon size={16} /> Nova imagem
              </Button>
            )}
          </div>
        </div>
        <Button>Salvar destino</Button>
      </form>
    </Form>
  )
}
