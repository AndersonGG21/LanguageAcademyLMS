
import com.lms.demo.dao.EnrollmentDAO;
import java.math.BigInteger;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public class EnrollDAOImp implements EnrollmentDAO {

    @PersistenceContext
    private EntityManager entityManager;
    
    @Override
    public BigInteger subjectsViewedValidation() {
        String query = "SELECT COUNT(*) FROM `enrollments` WHERE enrollment_course = 'ING001'";
        Query resul = entityManager.createNativeQuery(query);
        return (BigInteger) resul.getResultList().get(0);
    }
    
}
