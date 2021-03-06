import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch, MdClear } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';

import { signOut } from '~/store/modules/auth/actions';
import api from '~/services/api';
import History from '~/services/history';
import Pagination from '~/components/Pagination';
import Input from '~/components/SimpleInput';
import Actions from '~/components/MenuActions';
import Systems from '~/enums/EnumSystems';

import {
  Container,
  Content,
  Options,
  ContentTable,
  Table,
  Mensagem,
  Header,
  DivID,
  DivName,
  DivDescription,
  DivActions,
  DivSystem,
  TableRow,
  TextTable,
  AddButton,
  ClearButton,
} from './styles';

function JobControlList() {
  const [jobs, setJobs] = useState([]);
  const [name = '', setName] = useState();
  const [page = 1, setPage] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const treatmentError = useCallback(
    (error) => {
      function treatment() {
        if (error.response) {
          const { status } = error.response;
          if (status === 401) {
            dispatch(signOut());
          } else if (error.response.data) {
            toast.error(error.response.data.error);
          }
        } else {
          toast.error('Erro inesperado do sistema!');
        }
      }
      treatment();
    },
    [dispatch]
  );

  const loadJobs = useCallback(() => {
    async function load() {
      try {
        setLoading(true);
        const response = await api.get('jobs', {
          params: {
            name,
            page,
          },
        });

        setJobs(
          response.data.jobs.map((jobMap) => {
            const strsize = jobMap.description.length;

            const compact_desc =
              strsize > 110
                ? `${jobMap.description.substring(0, 110)}...`
                : jobMap.description;

            return {
              id: jobMap.id,
              name: jobMap.name,
              system: Systems.find((option) => option.value === jobMap.system),
              description: compact_desc,
            };
          })
        );
        setLoading(false);
      } catch (error) {
        setJobs([]);
        setLoading(false);
        treatmentError(error);
      }
    }
    load();
  }, [page, name, treatmentError]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  async function handleDelete(jobDelete) {
    try {
      await api.delete(`jobs/${jobDelete.id}`);
      toast.success('Job excluido com sucesso!');
      loadJobs();
    } catch (error) {
      treatmentError(error);
    }
  }

  function confirmDelete(jobDelete) {
    confirmAlert({
      title: 'Exclusão',
      message: 'Deseja excluir o Job?',
      buttons: [
        {
          label: 'Excluir',
          onClick: () => {
            handleDelete(jobDelete);
          },
        },
        {
          label: 'Cancelar',
          onClick: () => toast.warn('Exclusão Cancelada!'),
        },
      ],
    });
  }

  return (
    <Container>
      <Content>
        <h1>Gerenciando Job Control</h1>
        <Options>
          <Form>
            <Input
              name="jobSearch"
              IconInput={MdSearch}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome do Job"
              value={name}
            />
            <ClearButton
              name="clearSearch"
              type="button"
              IconButton={MdClear}
              onClick={() => setName('')}
            />
          </Form>
          <AddButton
            title="CADASTRAR"
            loading={loading}
            IconButton={MdAdd}
            type="button"
            onClick={() => {
              History.push('/jobs/store');
            }}
          />
        </Options>
      </Content>
      <ContentTable>
        <Table>
          <Header>
            <DivID>
              <strong>ID</strong>
            </DivID>
            <DivName>
              <strong>Nome do Job</strong>
            </DivName>
            <DivSystem>
              <strong>Sistema</strong>
            </DivSystem>
            <DivDescription>
              <strong>Descrição</strong>
            </DivDescription>
            <DivActions>
              <strong>Opções</strong>
            </DivActions>
          </Header>
        </Table>
      </ContentTable>
      <ContentTable>
        {loading ? (
          <Mensagem>
            <h1>Carregando Jobs...</h1>
          </Mensagem>
        ) : jobs.length <= 0 ? (
          <Mensagem>
            <h1>Não foi encontrado nenhum Job</h1>
          </Mensagem>
        ) : (
          <Table>
            {jobs.map((item) => (
              <TableRow key={item.id}>
                <DivID>
                  <TextTable>#{item.id}</TextTable>
                </DivID>
                <DivName>
                  <TextTable>{item.name}</TextTable>
                </DivName>
                <DivSystem>
                  <div className={`job_system ${item.system.value}`}>
                    <TextTable>{item.system.label}</TextTable>
                  </div>
                </DivSystem>
                <DivDescription>
                  <TextTable>{item.description}</TextTable>
                </DivDescription>
                <DivActions>
                  <Actions
                    Edit={() => History.push(`/jobs/update/${item.id}`)}
                    Delete={() => confirmDelete(item)}
                    Transmission={() =>
                      History.push(`/transmission/list/${item.id}`)
                    }
                  />
                </DivActions>
              </TableRow>
            ))}
          </Table>
        )}
      </ContentTable>
      <Pagination page={page} setPage={setPage} list={jobs} />
    </Container>
  );
}

export default JobControlList;
